
import {Chart} from 'chart.js/auto'
import {useEffect, useRef} from "react";

import styles from './style.module.sass'
import cn from "classnames";

// eslint-disable-next-line react/prop-types
const ScoresLineChart = ({labels, data, title}) => {

    const chartRef = useRef();

    useEffect(() => {
        const gradient = chartRef.current.getContext('2d').createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)'); // Start color
        gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

        const chart = new Chart(
            chartRef.current,
            {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            // borderCapStyle: 'round',
                            borderColor: '#464646',
                            tension: 0.3,
                            borderWidth: 1,
                            pointRadius: 0,
                            data: data,
                            fill: {
                                target: 'origin',
                                above: gradient // Apply gradient above the line
                            }
                        }
                    ]
                },
                options: {
                    scales: {
                        x: { grid: {display: false,} },
                        y: { grid: {display: false,} }
                    },
                    plugins: { legend: { display: false } }
                }
            }
        )
        return () => chart.destroy()
    }, [data, labels]);

    return (
        <div className={styles.root}>
            <div className={cn(styles.header, 'd-flex w-50 justify-content-between align-content-center mb-3')}>
                <div className={styles.title}>Успеваемость</div>
                <div className={styles.divider}>|</div>
                <div className={styles.subtitle}>{title}</div>
            </div>
            <canvas ref={chartRef}/>
        </div>
    )
}

export default ScoresLineChart