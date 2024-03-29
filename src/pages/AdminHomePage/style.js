const { default: styled, css } = require('styled-components')

export const AdminBashContainer = styled.div.withConfig({
    displayName: 'AdminBashContainer',
})`
    padding-top: 1rem;
`

export const AdminHomePageContainer = styled.div.withConfig({
    displayName: 'AdminHomePageContainer',
})`
    padding-top: 1rem;
    .center-menu {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const CardContainer = styled.div.withConfig({
    displayName: 'CardContainer',
})`
    padding-bottom: 1rem;
`
