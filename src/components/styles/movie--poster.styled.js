import styled from 'styled-components'

export const Poster = styled.div`
background-image: ${({src}) => `url(${src})`};
background-size: contain;
background-repeat: no-repeat;
height: 300px;
width: 210px;
transition: 300ms;
cursor: pointer;

@media screen and (min-width: 1200px)
{
    &:hover
    {
        height: 310px;
        width: 220px;
    }
}

@media screen and (max-width: 680px) 
{
    height: 225px;
    width: 150px;
}
`