// Плавная прокрутка для всех ссылок с якорями
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// Компонент аккордеона
class Accordion extends React.Component {
constructor(props) {
  super(props);
  this.state = { open: false };
}

render() {
  return HeadlessUI.Disclosure({
    as: "div",
    className: "mb-4",
    children: [
      HeadlessUI.DisclosureButton({
        as: "div",
        className: "flex justify-between items-center w-full px-4 py-3 text-left bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition",
        children: [
          React.createElement("h3", { className: "text-lg font-semibold" }, this.props.title),
          React.createElement("span", { className: "text-blue-500" }, 
            this.state.open ? '-' : '+')
        ],
        onClick: () => this.setState({ open: !this.state.open })
      }),
      HeadlessUI.Transition({
        show: this.state.open,
        enter: "transition duration-100 ease-out",
        enterFrom: "transform scale-95 opacity-0",
        enterTo: "transform scale-100 opacity-100",
        leave: "transition duration-75 ease-out",
        leaveFrom: "transform scale-100 opacity-100",
        leaveTo: "transform scale-95 opacity-0",
        children: HeadlessUI.DisclosurePanel({
          as: "div",
          className: "px-4 pt-2 pb-4 text-gray-700",
          children: this.props.children
        })
      })
    ]
  });
}
}

// Инициализация компонентов
document.addEventListener('DOMContentLoaded', function() {
// Инициализируем аккордеоны
document.querySelectorAll('[data-accordion]').forEach(el => {
  ReactDOM.render(
    React.createElement(Accordion, {
      title: el.getAttribute('data-title')
    }, el.innerHTML),
    el
  );
});
});
