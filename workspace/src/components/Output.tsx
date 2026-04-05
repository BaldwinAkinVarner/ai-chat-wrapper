import Button from '@mui/material/Button';

export default function Output(){
    return <div className="Output border-5px flex items-center">
        <div className="PromptMain">
            <div className="mainArea">
                <img></img>
                <p className="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus a autem nihil atque optio? Praesentium optio cumque architecto tenetur alias, exercitationem unde. Nesciunt rerum nisi atque pariatur totam porro numquam?</p>
            </div>
        </div>
        <div className="PromptFooter">
            <div className="inputField">
                <input type="text" placeholder="Senna Prompt Pussah Hoe"/>
                <Button className="submit" variant="contained">Hello Hit</Button>
            </div>
        </div>
    </div>;
}