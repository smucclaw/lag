import * as tsm from 'sect10-typescript/src/mathlang';
export {exprReduce, asDot} from 'sect10-typescript/src/mathlang';

// sets up a global variable tsm.symTab. Also copied from Meng's usecases code
export function setup(symtab: any) {
  const transformedJson = transformJson(symtab);
  return tsm.initSymTab(transformedJson);
}

// This is a temporary hack, just to make the Must Sing 5 example work.
// TODO: once we have a robust pipeline from
// sreadsheet -> schema -> LLM outputs values for user input using that same schema
// then we don't need to massage the schema because it will already have the same field names
function transformJson(input: {[key: string]: any}): {[key: string]: any} {
  const result: {[key: string]: any} = {};

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const value = input[key];

      // Check if the value is true, false or unknown
      if (String(value) === 'true' || String(value) === 'false') {
        result[key] = value === 'true';
      } else if (value === 'unknown') {
        result[key] = undefined;
      } else {
        // If value is none of these, transform it to a key with value "true"
        result[value] = true;
      }
    }
  }
  return result;
}

// copied from Meng's old code in usecases and shortened
export function myshow(expr: tsm.Expr<any>): tsm.Expr<any> {
  console.log('** ' + expr.val);
  tsm.explTrace(expr, 3);

  console.log('** JSON of symTab');
  console.log('#+NAME symtab');
  console.log('#+BEGIN_SRC json');
  console.log(JSON.stringify(tsm.symTab, null, 2));
  console.log('#+END_SRC');
  return expr;
}

// used to extend the symtab after evaluating different expressions
export function extendRecord(
  existing: Record<string, any>,
  updates: Record<string, any>
): Record<string, any> {
  for (const key in updates) {
    if (updates.hasOwnProperty(key)) {
      if (existing[key] === undefined) {
        existing[key] = updates[key];
      }
    }
  }
  return existing;
}

// TODO: these should be added here by transpiling the spreadsheet
// this thing is actually generated
export const Qualifies = () => {
  return new tsm.BoolFold('Qualifies', tsm.BoolFoldOp.All, [
    new tsm.GetVar('walks'),
    new tsm.BoolFold('any/all', tsm.BoolFoldOp.All, [
      new tsm.BoolFold('any/all', tsm.BoolFoldOp.Any, [
        new tsm.GetVar('drinks'),
        new tsm.GetVar('eats'),
      ]),
    ]),
  ]);
};
export const Drinks = () => {
  return new tsm.BoolFold('drinks', tsm.BoolFoldOp.All, [
    new tsm.BoolFold('any/all', tsm.BoolFoldOp.Any, [
      new tsm.GetVar('alcoholic'),
      new tsm.GetVar('non-alcoholic'),
    ]),
    new tsm.BoolFold('any/all', tsm.BoolFoldOp.All, [
      new tsm.BoolFold('any/all', tsm.BoolFoldOp.Any, [
        new tsm.GetVar('in part'),
        new tsm.GetVar('in whole'),
      ]),
    ]),
  ]);
};
