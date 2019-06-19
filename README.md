# jest-marmot
Jest React/Redux Test Framework DSL

# installation
```bash
yarn install --dev jest-marmot
```

# usage:
For a full redux/react-router example, see [Tests](https://github.com/axehomeyg/jest-marmot/blob/master/__test__/session.test.js)

```javascript
import Marmot, {scenario} from 'jest-marmot'
import {MyRootComponent} from 'myRootComponent'

Marmot.root(() => <MyRootComponent />)

describe("My Feature", () => {
  scenario("My specific scene")
    .see("Hey Fella")
    .fillIn("Email", "test@jest-marmot.com")
    .click({testId: "submit"})
    .see("Welcome, " + "test@jest-marmot.com")
    .run()
})
```
