
const sidebarAll = () => {
  return [
    {
      title: "精华",
      collapsable: false,
      children: [
        ["npm-install原理分析", "npm-install原理分析"],
        ["23种设计模式的通俗解释", "23种设计模式的通俗解释"]
      ]
    }
  ]
}


const all = {
  all: sidebarAll()
}

module.exports = all;
