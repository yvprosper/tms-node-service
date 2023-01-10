const arrangeRuleObject = (data) => {
  const orderWhenObject = () => {
    const arr = [];
    let grp = {}
    data.groups.map((group)=> {
      for (let i = 0; i < group.sentences.length; i += 1) {
        let firstObject;
        let secondObject;
        if (group.sentences[i].action === null || group.sentences[i].action === undefined) {
          firstObject = { obj: `${data.header}.${group.sentences[i].inputField}`}
        } else {
          firstObject = group.sentences[i].filterFields ?  { call: ["CF.Aggregation", {
            const: `{'action': ${group.sentences[i].action} , 'filter_fields': ${JSON.stringify(group.sentences[i].filterFields).replace(/\"/g, "'")}, 'action_field': ${group.sentences[i].actionField}, 'date_range': ${`[${group.sentences[i].dateRange}]`}})`
          }]} : { call: ["CF.Aggregation", {
            const: `{'action': ${group.sentences[i].action} , 'action_field': ${group.sentences[i].actionField}, 'date_range': ${`[${group.sentences[i].dateRange}]`}})`
          }]}
        }
        if (group.sentences[i].type === "static"){
          secondObject = { const: group.sentences[i].compareTo}
        } else{
          secondObject = {obj: `${data.header}.${group.sentences[i].compareTo}`}
        }
        grp = {
          [`${group.sentences[`${i}`].operation}`]: [
            
             firstObject,
             secondObject,
          ],
        }
      }
    })
    let whenObj;
    if (data.groupOperator !== null) {
      arr.push(grp);
      whenObj = {[data.groupOperator]: arr}
    } else {
      whenObj = grp
    }
    return whenObj;
  };
  const orderThenArray = () => {
    const arr = [];
      arr.push({
        set: [{ obj: `Alert.Tag`},
        { const: data.tag }],
      },
      {
        call: [`Retract`, { const: data.name }]
      });

    return arr;
  };
  const rule = {
    name: data.name,
    desc: data.desc,
    salience: data.priority,
    when: orderWhenObject(),
    then: orderThenArray(),
  };
  return rule;
};


module.exports = arrangeRuleObject