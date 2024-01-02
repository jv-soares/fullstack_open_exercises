import { useState } from 'react';

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const total = good + neutral + bad;
    const average = (good * 1 + bad * -1) / total;
    const percentage = (good / total) * 100;

    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <Button onClick={() => setGood(good + 1)} label="good"></Button>
                <Button
                    onClick={() => setNeutral(neutral + 1)}
                    label="neutral"
                ></Button>
                <Button onClick={() => setBad(bad + 1)} label="bad"></Button>
            </div>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                average={average}
                percentage={percentage}
            ></Statistics>
        </div>
    );
};

const Button = ({ onClick, label }) => (
    <button onClick={onClick}>{label}</button>
);

const Statistics = (props) => (
    <div>
        <h1>statistics</h1>
        {props.total == 0 ? (
            <p>No feedback given</p>
        ) : (
            <table>
                <tbody>
                    <StatisticLine
                        text="good"
                        value={props.good}
                    ></StatisticLine>
                    <StatisticLine
                        text="neutral"
                        value={props.neutral}
                    ></StatisticLine>
                    <StatisticLine text="bad" value={props.bad}></StatisticLine>
                    <StatisticLine
                        text="total"
                        value={props.total}
                    ></StatisticLine>
                    <StatisticLine
                        text="average"
                        value={props.average}
                    ></StatisticLine>
                    <StatisticLine
                        text="positive"
                        value={props.percentage + '%'}
                    ></StatisticLine>
                </tbody>
            </table>
        )}
    </div>
);

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

export default App;
