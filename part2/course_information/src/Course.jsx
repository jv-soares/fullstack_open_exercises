const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
    );
};

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part
                key={part.id}
                name={part.name}
                exercises={part.exercises}
            ></Part>
        ))}
    </>
);

const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
);

const Total = ({ parts }) => {
    const count = parts.reduce((acc, current) => acc + current.exercises, 0);
    return <p style={{ fontWeight: 'bold' }}>Total of {count} exercises </p>;
};

export default Course;
