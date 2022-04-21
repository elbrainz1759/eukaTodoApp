import { Typography } from "@material-ui/core";

const HeadText = ({title, subTitle}:{title:string, subTitle:string}) => {
    return(
        <>
    <Typography
    variant="h3"
    align="center"
    gutterBottom
    style={{ marginBottom: "1em" }}
    >
    {title}
    </Typography>
    <Typography
    variant="h6"
    align="center"
    gutterBottom
    style={{ marginBottom: "1em" }}
    >
    {subTitle}
    </Typography>
    </>
    )
}

export default HeadText

