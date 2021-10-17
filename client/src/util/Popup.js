import React from 'react'
import { Button } from 'semantic-ui-react'

function Popup(props) {
    return (props.trigger) ? (
        <div>
            <Button secondary onClick={() => props.setTrigger(false)}>Cancel</Button>
            <Button primary onClick={ }>Secondary</Button>
        </div>
    ) : "";
}

export default Popup;