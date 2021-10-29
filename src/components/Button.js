import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
border-radius: 5px;
padding: 5px 8px;
background: #4666ff;
&:hover {
    cursor: pointer;
    background: #5676ff;
}
`
const Button = ({children, ...restProps}) => {

    return <Container {...restProps}>
            {children}
    </Container>
}
export default Button;