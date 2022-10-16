const SumExs = (props) => {
    const { parts } = props
    
    const sum = parts.reduce((accumulator, i_n_exercices) => {
        return accumulator + i_n_exercices.exercises
    }, 0 // accumulator = 0 initially
    )

    return (
        <p>total of {sum} exercices</p>
    )
}

const Course = (props) => {
    const { course } = props

    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => 
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>
                )}
            </ul>
            <SumExs parts={course.parts}/>
        </div>
    )
}

export default Course

// reduce info (how to sum values in object array): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce