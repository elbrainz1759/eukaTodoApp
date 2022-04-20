import { Typography } from "@material-ui/core";

const HeadText: React.FC = (props) => {
    return(
        <>
    <Typography
    variant="h3"
    align="center"
    gutterBottom
    style={{ marginBottom: "1em" }}
    >
    {props.title}
    </Typography>
    <Typography
    variant="h6"
    align="center"
    gutterBottom
    style={{ marginBottom: "1em" }}
    >
    {props.subTitle}
    </Typography>
    </>
    )
}

export default HeadText

