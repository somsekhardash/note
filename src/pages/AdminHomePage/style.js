const { default: styled, css } = require('styled-components')

const AdminBashContainer = styled.div.withConfig({
    displayName: 'AdminBashContainer',
})`
    padding-top: 1rem;
`

const AdminHomePageContainer = styled.div.withConfig({
    displayName: 'AdminHomePageContainer',
})`
    padding-top: 1rem;
`

const CardContainer = styled.div.withConfig({ displayName: 'CardContainer' })`
    padding-bottom: 1rem;
`

module.exports = {
    AdminBashContainer,
    AdminHomePageContainer,
    CardContainer,
}
