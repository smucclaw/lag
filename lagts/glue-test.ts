
//import * as tsm from '../../usecases/sect10-typescript/src/mathlang';
import { setup, exprReduce, myshow, Qualifies, Drinks } from './generated';
import { transpile } from './tojson'

const mengs_output = { "index":0
, "message":
    { "role":"assistant"
    , "content":null
    , "tool_calls":
        [
            { "id":"call_SSrGnyCScXJLqOMP5dgHAL8F"
            , "type":"function"
            , "function":
                { "name":"compute_qualifies"
                , "arguments": {
                    "walks": "false",
                    "eats": "false",
                    "drinks": "false",
                    "beverage type": "non-alcoholic",
                    "in whole": "unknown"
                    }
                }
            }
        ]
    }
, "logprobs":null
, "finish_reason":"tool_calls"
}

function get_values(input: any) {
    return input["message"]["tool_calls"][0]["function"]["arguments"];
}


// This is copied and simplified from usecases/sect10-typescript/crunch.ts
// Maybe there's a better place for it???
function go(user_input:any) {
    setup(user_input);
    const expr = Qualifies()
    const output = transpile(expr)
    console.log(output)

    const asDict = exprReduce(expr)

    // const exprval = asDict.testPoint ? asDict.testPoint : expr.val
    console.log("The whole expression evaluates to:", expr.val, "\n\n")


    console.log (`** input JSON`)
    console.log (`#+BEGIN_SRC js`)
    console.log (JSON.stringify(user_input, null, 2))
    console.log (`#+END_SRC`)

    myshow(expr)

    console.log("** reduced expr as dict")
    console.log (`#+BEGIN_SRC js`)
    console.log(JSON.stringify(exprReduce(expr), null, 2))
    console.log (`#+END_SRC`)
  }

// This returns a bunch of nonsense
go(get_values(mengs_output))