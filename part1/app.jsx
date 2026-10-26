import {useState} from 'react';

const StatisticsLine = (props) => {
    return (
        <div>
            <p>{props.text} {props.value}</p>
        </div>
    )
}

const Statistics = ( good, neutral, bad ) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    else {  
    const all = good + neutral + bad;
    const average = ( good - bad ) / all;
    const positive = ( good / all ) * 100;

    return (
        <div>
            <h1>statistics</h1>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={`${positive}%`} />

        </div>
    )
}}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics good = {good} neutral = {neutral} bad = {bad} />
        </div>
    )
}