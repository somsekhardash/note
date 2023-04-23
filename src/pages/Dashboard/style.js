const { default: styled, css } = require('styled-components')

export const DashboardLayout = styled.div.withConfig({
    displayName: 'DashboardLayout',
})`
    height: 100vh;
    display: grid;
    background-color: gray;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 60px 1fr;
`

export const DashboardSidebar = styled.div.withConfig({
    displayName: 'DashboardSidebar',
})`
    background-color: red;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
`

export const DashboardBody = styled.div.withConfig({
    displayName: 'DashboardBody',
})`
    background-color: green;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 112px 200px 200px 210px;
    gap: 1em;
    padding: 1em;
`

export const DashboardHeader = styled.div.withConfig({
    displayName: 'DashboardHeader',
})`
    background-color: blue;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
`

export const DashCardV1 = styled.div.withConfig({
    displayName: 'DashCardV1',
})`
    background-color: pink;
    border-radius: 10px;
    max-height: 100%;
`

export const DashCardV2 = styled.div.withConfig({
    displayName: 'DashCardV2',
})`
    border-radius: 10px;
    grid-column: 1 / 3;
    grid-row: 2 / 4;
    overflow-y: scroll;
    .accordion {
        .title {
            display: flex;
            justify-content: space-between;
        }
    }
`

export const DashCardV3 = styled.div.withConfig({
    displayName: 'DashCardV3',
})`
    border-radius: 10px;
    grid-column: 1 / 3;
    grid-row: 4 / 5;
    overflow-y: auto;
`

export const DashCardV4 = styled.div.withConfig({
    displayName: 'DashCardV4',
})`
    grid-column: 3 / 5;
    grid-row: 2 / 5;
    overflow-y: auto;
`
