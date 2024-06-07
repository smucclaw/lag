import { writeFile } from "fs";
import * as tsm from '../../usecases/sect10-typescript/src/mathlang';
export { transpile }

interface Node {
  operation: NodeOp;
  args?: Array<number | string | Node>;
  annotation?: string;
  weight: number;
}

// Copied from mathlang-vis, here to make it compatible
type NodeBoolOp =
  | "BoolNot"
  | "And"
  | "Or"
  | "BoolEq"
  | "BoolNeq"
  | "Any"
  | "All";
type NodeArithOp =
  | "Neg"
  | "Add"
  | "Sub"
  | "Mul"
  | "Div"
  | "Max"
  | "Min"
  | "Sum"
  | "Modulo"
  | "Product";
type NodeArithCmpOp = "Lt" | "Lte" | "Gt" | "Gte" | "Eq" | "Neq";
type NodeConditionalOp = "IfThenElse";
type NodeConstantOp = "Number" | "Unevaluated";
type NodeDataType = "Integer" | "Boolean";
type NodeOp = NodeBoolOp | NodeArithOp | NodeArithCmpOp | NodeConditionalOp | NodeConstantOp;

function transpile<T>(data: tsm.Expr<T>) : (Node | string) {
  // console.log(data.constructor.name)
  switch(data.constructor.name) {
    // No deepening - just a value
    case 'GetVar': {
      const get_var = data as tsm.GetVar<T>;
      const name = get_var.name;
      // console.log(123, get_var);
      // return {
      //   operation: 'Get',
      //   args: [get_var.name],
      //   annotation: "GetVariable",
      //   weight: 1,
      // }
      if (name in tsm.symTab) {
        const value = tsm.symTab[name as keyof Object] as unknown as number;
        // console.log("Name in default_symbols : ", name, value)
        return {
          operation: 'Number',
          args: [value],
          annotation: name,
          weight: 1,
        };
      }

      return {
        operation: 'Unevaluated',
        // args: [name],
        annotation: name,
        weight: 1,
      }

      return name;
      // return get_var.expl
    }
    case 'Bool2': {
      // AND | OR | EQ | NOT_EQ
      const b2 = data as unknown as tsm.Bool2;
      let operator: NodeOp;
      switch (b2.operator) {
        case tsm.BoolBinOp.And: operator = "And";
        case tsm.BoolBinOp.Or: operator = "Or";
        case tsm.BoolBinOp.BoolEq: operator = "BoolEq"; // Boolean EQ
        case tsm.BoolBinOp.BoolNeq: operator = "BoolNeq"; // Boolean NEQ
      }

      return {
        operation: operator,
        args: [
          transpile(b2.arg1),
          transpile(b2.arg2),
        ],
        annotation: b2.expl,
        weight: 1,
        // type: "boolean",
      }
    }
    // If conditions
    case 'Bool3': {
      const b3 = data as tsm.Bool3<T>;
      return {
        operation: 'IfThenElse',
        args: [
          transpile(b3.arg1), // If
          transpile(b3.arg2), // Then
          transpile(b3.arg3) // Else
        ],
        annotation: b3.expl, // TODO : Unsure if this annotation is useful
        weight: 1,
      }
    }
    case 'Num0': {
      const n0 = data as tsm.Num0;
      // console.log(n0);
      // Print it out to make sure
      if (n0.val == undefined) {
        console.log("Setting n0.val to be 0");
        n0.val = 0;
      }
      return {
        operation: 'Number',
        args: [n0.val],
        annotation: n0.expl,
        weight: 1,
      };
    }
    // case 'Num2': {
    //   const n2 = data as unknown as tsm.Num2;
    //   // console.log(n2);
    //   // console.log(n2.expl);

    //   let operator: NodeOp;
    //   switch (n2.operator) {
    //     case tsm.NumBinOp.Add:    operator = "Add";
    //     case tsm.NumBinOp.Sub:    operator = "Sub";
    //     case tsm.NumBinOp.Mul:    operator = "Mul";
    //     case tsm.NumBinOp.Div:    operator = "Div";
    //     case tsm.NumBinOp.MaxOf2: operator = "Max";
    //     case tsm.NumBinOp.MinOf2: operator = "Min";
    //   }

    //   return {
    //     operation: operator,
    //     args: [
    //       transpile(n2.arg1),
    //       transpile(n2.arg2),
    //     ],
    //     annotation: n2.expl,
    //     weight: 1,
    //   }
    // }
    case 'NumFold': {
      // Max min sum product
      const numFold = data as unknown as tsm.NumFold;
      let operator: NodeOp;
      switch (numFold.operator) {
        case tsm.NumFoldOp.Max: operator = "Max";
        case tsm.NumFoldOp.Min: operator = "Min";
        case tsm.NumFoldOp.Sum: operator = "Sum";
        case tsm.NumFoldOp.Product: operator = "Product";
      }
      return {
        operation: operator,
        args: numFold.args.map((e) => transpile(e)),
        annotation: numFold.expl,
        weight: 1,
      }
    }
    case 'NumToBool2': {
      // < | <= | > | >= | == | !=
      const numToBool2 = data as unknown as tsm.NumToBool2;
      let operator: NodeOp;
      switch (numToBool2.operator) {
        case tsm.NumToBoolOp.NBlt:  operator = "Lt";
        case tsm.NumToBoolOp.NBlte: operator = "Lte";
        case tsm.NumToBoolOp.NBgt:  operator = "Gt";
        case tsm.NumToBoolOp.NBgte: operator = "Gte";
        case tsm.NumToBoolOp.NBeq:  operator = "Eq";
        case tsm.NumToBoolOp.NBneq: operator = "Neq";
      }
      return {
        operation: operator,
        args: [
          transpile(numToBool2.arg1),
          transpile(numToBool2.arg2)
        ],
        annotation: numToBool2.expl,
        weight: 1,
      }
    }
    case 'BoolFold': {
      const boolfold = data as unknown as tsm.BoolFold;
      let operator: NodeOp;
      switch (boolfold.operator) {
        case tsm.BoolFoldOp.All: operator = "All";
        case tsm.BoolFoldOp.Any: operator = "Any";
      }
      return {
        operation: operator,
        args: boolfold.args.map((e) => transpile(e)),
        annotation: boolfold.expl,
        weight: 1,
      }
    }
    default: {
      console.log("Not handled : ", data.constructor.name)
    }
  }
}


// const claimable_expr = transpile(input);
// const json_obj = JSON.stringify(claimable_expr, null, 2);
// // console.log(json_obj)

// writeFile("data.json", json_obj.toString(), (err) => {
//   if (err) throw err;
// })