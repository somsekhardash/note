const { default: styled, css } = require('styled-components')

const ReportCardContainer = styled.div.withConfig({
    displayName: 'ReportCardContainer',
})`
    margin-bottom: 1rem;
    .full-width {
        width: 100%;
    }
`

module.exports = {
    ReportCardContainer,
}
