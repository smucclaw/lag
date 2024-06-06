
//import * as tsm from '../../usecases/sect10-typescript/mathlang';
import { setup, exprReduce, myshow, Qualifies } from './generated';

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
                , "arguments": {"walks": "true", "eats": "false", "drinks": "true", "beverage type": "non-alcoholic", "in whole": "unknown"}
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
    const asDict = exprReduce(expr)

    const exprval = asDict.testPoint ? Math.round(asDict.testPoint) : expr.val
    console.log("The whole expression evaluates to:", exprval, "\n\n")


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