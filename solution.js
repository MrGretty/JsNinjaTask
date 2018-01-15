function drawNestedSetsTree(data, node) {
    const tree = {
        value: 'root',
        level: 0,
    }
    data.sort((a, b) => a.left - b.left).reduce(({ previousValue, tree }, currentValue, index, data) => {
        if (previousValue.level === 0 || previousValue.right > currentValue.left) {
            previousValue.children = [...(previousValue.children || []), currentValue];
            currentValue.parent = previousValue;
            currentValue.level = previousValue.level;
            ++currentValue.level;
        } else if (previousValue.right < currentValue.left) {
            while (previousValue.right < currentValue.left) {
                previousValue = data[--index];
            }
            previousValue.children = [...(previousValue.children || []), currentValue];
            currentValue.parent = previousValue;
            currentValue.level = (previousValue.level + 1);
        } else if ((currentValue.right - currentValue.left) === 1) {
            let tempLevel = previousValue.level;
            while (tempLevel - 1 !== data[index].level) {
                data[index--];
            }
            previousValue = data[index];
            previousValue.children = [...(previousValue.children || []), currentValue];
            currentValue.parent = previousValue;
            currentValue.level = tempLevel;
        }
        return {
            previousValue: currentValue
        };
    }, { previousValue: tree });

    const ul = document.createElement('ul');
    node.appendChild(ul);
    OutPutTree(data[0], ul);
}

function OutPutTree(data, ulMain) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = data.title;
    if (data.children) {
        data.children.forEach((item) => {
            ulMain.appendChild(li);
            li.appendChild(ul);
            OutPutTree(item, ul);

        });
    } else {
        ulMain.appendChild(li);
    }
}


if (typeof module !== 'undefined') {
    module.exports = drawNestedSetsTree;
}