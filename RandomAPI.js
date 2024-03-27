//返回三个随机整数数
module.exports = function(){
    let lucky,unlucky,chance
    let num = 5
    function getRandomInt(x) {
        return Math.floor(Math.random() * x)+2;
    }
    function getUnlucky(){
        let temp = getRandomInt(num)
        unlucky = temp===lucky?getUnlucky():temp
        return unlucky
    }
    function getChance(){
        let temp = getRandomInt(num)
        chance = temp===lucky||temp===unlucky?getChance():temp
        return chance
    }
    function getAll(){
        lucky = getRandomInt(num)
        getUnlucky()
        getChance()
    }
    getAll()
    return [lucky,unlucky,chance]
}


