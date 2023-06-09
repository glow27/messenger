import Handlebars from 'handlebars';

export const formTemplate = Handlebars.compile(
  `<div class="centeredContainer">
    <form class="form">
      <h3>{{ formTitle }}</h3>
      {{#each fields}}
      {{{ this }}}
      {{/each}}
      {{{ button }}}
      {{{ link }}}
    </form>
  </div>`
);
