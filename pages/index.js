import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import format from 'date-fns/format'
import groupBy from 'lodash/groupBy'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Timeline = styled.div`
  position: relative;
  font-size: 28px;
  font-family: sans-serif;
  width: auto;
  margin: 0 auto;
  background: gainsboro;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    bottom: 0;
    width: 2px;
    background: currentColor;
  }
`

const Box = styled.div`
  position: relative;
  padding: 10px;
  background: yellow;
`

const Year = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const YearLabel = styled(Box)``

const Days = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 10px;
`

const Day = styled.div`
  position: relative;
  gap: 20px;
  align-items: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const DayLabel = styled(Box)`
  position: sticky;
  top: 0;
`

const DayEvents = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const DayEvent = styled(Box)``

export default function Home({ years }) {
  return (
    <Wrap>
      <Timeline>
        {years.map(year => {
          return (
            <Year key={year.label}>
              <YearLabel>{year.label}</YearLabel>
              <Days>
                {year.days.map(day => {
                  return (
                    <Day key={day.label}>
                      <DayLabel>{day.label}</DayLabel>
                      <DayEvents>
                        {day.events.map(event => (
                          <DayEvent key={event.key}>{event.label}</DayEvent>
                        ))}
                      </DayEvents>
                    </Day>
                  )
                })}
              </Days>
            </Year>
          )
        })}
      </Timeline>
    </Wrap>
  )
}

export async function getStaticProps() {
  const dayInterval = eachDayOfInterval({
    start: new Date(2016, 9, 6),
    end: new Date(2022, 9, 10)
  }).reverse()
  const days = dayInterval.map(date => {
      const eventsLength = Math.floor(Math.random() * 20) - 10
      const events = Array
        .from({length: eventsLength}, (v, i) => i)
        .map(i => ({
          key: i,
          label: `Event ${i}`
        }))
      return {
        label: format(date, 'do MMMM'),
        year: date.getFullYear(),
        events,
      }
    })
    .filter(d => d.events.length > 0)
  const yearDays = groupBy(days, d => d.year)
  const years = Object.keys(yearDays).reverse().map(year => ({
    label: year,
    days: yearDays[year]
  }))
  return {
    props: {
      years,
    },
  }
}
