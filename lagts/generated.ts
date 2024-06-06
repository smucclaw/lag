import * as tsm from '../../usecases/sect10-typescript/src/mathlang';
export { exprReduce, asDot } from '../../usecases/sect10-typescript/src/mathlang';

export function setup (symtab : any) {
    const transformedJson = transformJson(symtab);
    return tsm.initSymTab(transformedJson)
  }

function transformJson(input: { [key: string]: string }): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            const value = input[key];

            // Check if the value is true, false or unknown
            if (value === "true" || value === "false" || value === "unknown") {
                result[key] = value ;
            } else {
                // If value is none of these, transform it to a key with value "true"
                result[value] = "true";
            }
        }
    }
    return result;
}

export function myshow(expr: tsm.Expr<any>) : tsm.Expr<any> {
    console.log("** " + expr.val)
    tsm.explTrace(expr, 3)

    console.log("** JSON of symTab")
    console.log("#+NAME symtab")
    console.log("#+BEGIN_SRC json")
    console.log(JSON.stringify(tsm.symTab,null,2))
    console.log("#+END_SRC")
    return expr
  }


// TODO: these should be added here by transpiling the spreadsheet
export const Qualifies = () => {return new tsm.BoolFold ( "Qualifies"
                 , tsm.BoolFoldOp.All
                 , [ new tsm.GetVar ("walks")
                     , new tsm.BoolFold ( "any/all"
                                        , tsm.BoolFoldOp.All
                                        , [ new tsm.BoolFold ( "any/all"
                                                             , tsm.BoolFoldOp.Any
                                                             , [ new tsm.GetVar ("drinks")
                                                                 , new tsm.GetVar ("eats") ] ) ] ) ] )}
export const Drinks = () => {return new tsm.BoolFold ( "drinks"
                 , tsm.BoolFoldOp.All
                 , [ new tsm.BoolFold ( "any/all"
                                      , tsm.BoolFoldOp.Any
                                      , [ new tsm.GetVar ("alcoholic")
                                          , new tsm.GetVar ("non-alcoholic") ] )
                     , new tsm.BoolFold ( "any/all"
                                        , tsm.BoolFoldOp.All
                                        , [ new tsm.BoolFold ( "any/all"
                                                             , tsm.BoolFoldOp.Any
                                                             , [ new tsm.GetVar ("in part")
                                                                 , new tsm.GetVar ("in whole") ] ) ] ) ] )}