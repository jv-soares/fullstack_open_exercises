const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            { name: 'Fundamentals of React', exercises: 10 },
            { name: 'Using props to pass data', exercises: 7 },
            { name: 'State of a component', exercises: 14 },
        ],
    };

    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
    );
};

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
    <>
        {props.parts.map((part) => (
            <Part
                key={part.name}
                name={part.name}
                exercises={part.exercises}
            ></Part>
        ))}
    </>
);

const Part = (props) => (
    <p>
        {props.name} {props.exercises}
    </p>
);

const Total = (props) => (
    <p>
        Number of exercises{' '}
        {props.parts.reduce((acc, current) => acc + current.exercises, 0)}
    </p>
);

export default App;
