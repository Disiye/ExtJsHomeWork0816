
function menuItemClick(item) {
    switch (item.id) {
        case 'addNew':
            let addNode = item.parentMenu.contextNode;
            var uuid = getUuid();
            var hasParent = addNew.parentNode != null ? true : false;
            if (hasParent) {
                uuid += "-student";
            } else {
                uuid += "-class";
            }
            Ext.MessageBox.show({
                title: 'Add',
                msg: 'Please input :',
                width: 300,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                fn: (btn, text) => {
                    let name = text;
                    var newNode = new Ext.tree.TreeNode({
                        text: name,
                        id: uuid,
                        leaf: hasParent,
                        checked: true,
                        expanded: true
                    });
                    addNode.appendChild(newNode);
                }
            });
            break;
        case 'DeleteNode':
            let deleteNode = item.parentMenu.contextNode;
            if (deleteNode.parentNode) {
                deleteNode.remove();
            }
    }
};

function treePanelContextMenu(node, e) {
    node.select();
    let treeContextMenu = node.getOwnerTree().contextMenu;
    treeContextMenu.contextNode = node;
    treeContextMenu.showAt(e.getXY());
}

function treePanelClick(node) {
    currentClickNodeId = node.id
}

function addClassAndStudent(btn, event) {
    if (currentClickNodeId === "" || currentClickNodeId.length === 0) {
        Ext.MessageBox.alert('Please', "Please select where you want to add it.）");
        return;
    }
    debugger
    let currentNode = itaTreePanel.getNodeById(currentClickNodeId);
    let uuid = getUuid();
    let hasParent = currentNode.parentNode != null ? true : false;
    if (hasParent) {
        uuid += "-student";
    } else {
        uuid += "-class";
    }
    let name = simple.form.findField('inputClsOrStuNameLabel').getValue()
    var newNode = new Ext.tree.TreeNode({
        text: name,
        id: uuid,
        leaf: hasParent,
        checked: true,
        expanded: true
    });
    currentNode.appendChild(newNode);
}

var generateUUId = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
var getUuid = function () {
    return generateUUId();
};

var currentClickNodeId = "";