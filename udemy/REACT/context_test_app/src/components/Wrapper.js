import React from "react";
import {Name, LastName} from './Name'

const Wrapper = () => {
    return (
        <>
        <div className = 'wrapper'>
            <Name/>
        </div>
          <div className = 'wrapper'>
          <LastName/>
        </div>
      </>
    )
}
export default Wrapper;