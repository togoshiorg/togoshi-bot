module.exports = (robot) => {
    robot.hear(/すし/, (res) => {
        res.send(':sushi:');
    });
}
