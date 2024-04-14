
import styles from './style.module.sass'
import {useEffect, useRef, useState} from "react";
import {Chart} from "chart.js/auto";

const getData = (scores, maxScore) => {
    const result = {
        red: 0,
        blue: 0,
        yellow: 0,
    }
    scores.forEach(score => {
        const percentage = score / maxScore
        if (percentage <= 0.5) {
            result.red++
        }
        else if (percentage <= 0.75) {
            result.blue++
        }
        else {
            result.yellow++
        }
    })
    return [result.red, result.blue, result.yellow]
}

const SubjectScoresChart = ({scores, maxScore}) => {
    const [red, setRed] = useState(0)
    const [blue, setBlue] = useState(0)
    const [yellow, setYellow] = useState(0)

    const chartRef = useRef();

    useEffect(() => {
        const [red, blue, yellow] = getData(scores, maxScore)
        const max = scores.length
        setRed((red / max) * 100)
        setBlue((blue / max) * 100)
        setYellow((yellow / max) * 100)
        const chart = new Chart(
            chartRef.current,
            {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [red, blue, yellow],
                        backgroundColor: [
                            '#6e6363',
                            '#B1E3FF',
                            '#A1E3CB'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    borderRadius: 10,
                    plugins: { legend: { display: false } },
                }
            }
        )

        return () => chart.destroy()
    }, [maxScore, scores]);

    return (
        <div className={styles.root}>
            <div className={styles.title}>Количество баллов</div>
            <div className={'mt-3 d-flex'}>
                <div className={'offset-1 col-2'}>
                    <canvas ref={chartRef}/>
                </div>
                <div className={'offset-1 col-8 d-flex align-content-center'}>
                    <div className={'col-3'}>
                        <div className={'mt-3'}>Больше 75%</div>
                        <div className={'mt-3'}>50% {'<'} x {'<'} 75%</div>
                        <div className={'mt-3'}>меньше 50%</div>
                    </div>
                    <div className={'col-3'}>
                        <div className={'mt-3'}>{yellow}%</div>
                        <div className={'mt-3'}>{blue}%</div>
                        <div className={'mt-3'}>{red}%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubjectScoresChart