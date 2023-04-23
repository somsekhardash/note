const { default: styled, css } = require('styled-components')

export const ButtonsLayout = styled.div.withConfig({
    displayName: 'ButtonsLayout',
})`
    justify-content: space-between;
    display: flex;
    align-items: center;
`
