const arrangeRuleObject = (data) => {
  const orderWhenObject = () => {
    const arr = [];
    for (let i = 0; i < data.when.sentence.length; i += 1) {
      arr.push({
        [`${data.when.sentence[`${i}`].operator}`]: [
          {
            obj: `${data.header}.${data.when.sentence[i].modelField}`,
            const: data.when.sentence[i].const,
          },
        ],
      });
    }
    return arr;
  };
  const orderThenArray = () => {
    const arr = [];
    for (let i = 0; i < data.then.set.length; i += 1) {
      arr.push({
        set: [{ obj: `${data.header}.${data.then.set[i].obj}`, const: data.then.set[i].const }],
      });
    }

    for (let i = 0; i < data.then.call.length; i += 1) {
      arr.push({ call: [`${data.then.call[i].action}`, { const: data.then.call[i].const }] });
    }

    return arr;
  };
  const rule = {
    name: data.name,
    desc: data.desc,
    salience: data.salience,
    when: {
      [data.when.operator]: orderWhenObject(),
    },
    then: orderThenArray(),
  };
  return rule;
};


module.exports = arrangeRuleObject