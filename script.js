const justRound = document.querySelector('.just-round')
const spents = document.querySelectorAll('.spent')
const polly = document.querySelectorAll('.poll-child')

const moveIt = function() {
    justRound.style.transform = 'translateX(-15px)';
    justRound.style.transition = '400ms ease 1s';
}
setTimeout(moveIt, 800)

async function chartData() {
    try {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new error('Error nla')
        }
        const datas = await response.json()
        datas.forEach((data, index) => {
            const days = document.querySelectorAll('.days')
            // const spents = document.querySelectorAll('.spent')
            if (days[index]) {
                days[index].textContent = data.day
            }

            if (spents[index]) {
                spents[index].textContent = `$${data.amount}`
            }
        })
        const thisWeek = document.querySelector('.this-week')
        const balanceAmount = document.querySelector('.balance-amount')
        const weekly = datas.map(data => data.amount)
        raceBar(weekly)
        const weekTotal = weekly.reduce((acc, cur) => acc + cur, 0)
        thisWeek.textContent = `$${weekTotal}`
        const totalBalance = 1000;
        const balance = totalBalance - weekTotal;
        balanceAmount.textContent = `$${balance}`

        polly.forEach((pol, ind) => {
            pol.addEventListener('mouseover', () => {
                const highest = Math.max(...weekly)
                const indexOfHighest = weekly.indexOf(highest)
                if (ind == indexOfHighest) {
                    polly[indexOfHighest].style.backgroundColor = 'hsl(186, 34%, 60%)'
                } else {
                    polly[indexOfHighest].style.backgroundColor = 'hsl(10, 79%, 65%)'
                }
                // console.log(ind);
            })
        });
        
        // setTimeout(, 3000)
    } catch (error) {
        console.error(error)
    }
}
chartData()

const In = (element) => {
    element.style.transform = 'translateY(0)'
    element.style.transition = '1s ease'
}

const raceBar = (heights) => {
    const bars = document.querySelectorAll('.poll-wrap')
    heights.forEach((height, indy) => {
        if (height < 100) {
            bars[indy].style.height = `${height + 20}%`
            
        } else {
            bars[indy].style.height = '100%'
        }
    })

    setTimeout(() => {
        bars.forEach(bar => {
           In(bar);
        })
    }, 1000)
}


polly.forEach((poll, index) => {
    poll.addEventListener('mouseover', () => {
        spents.forEach(spent => {
            spent.style.transform = 'translateY(-25px)'
        })
        spents[index].style.transform = 'translateY(0)'
    })
})

// const completed = function() {
//     function getData(numbers) {
//         const highest = Math.max(...numbers)
//         const indexOfHighest = numbers.indexOf(highest)
//         polly[indexOfHighest].style.backgroundColor = 'hsl(186, 34%, 60%);';
//         console.log(numbers);
//     }
//     getData(numbers)
// }
// completed()

// function getData(numbers) {
//     const highest = Math.max(...numbers)
//     const indexOfHighest = numbers.indexOf(highest)
//     polly[indexOfHighest].style.backgroundColor = 'hsl(186, 34%, 60%)'
// }



// function() {
//     const highest = Math.max(...weekly)
//     const indexOfHighest = weekly.indexOf(highest)
//     polly[indexOfHighest].style.backgroundColor = 'hsl(186, 34%, 60%)'
// }