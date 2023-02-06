const { default: styled, css } = require('styled-components')

const HomePageWrapper = styled.div.withConfig({
    displayName: 'HomePageWrapper',
})`
    display: grid;
`
module.exports = {
    HomePageWrapper,
}
