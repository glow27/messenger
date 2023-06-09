import Handlebars from 'handlebars';

export const errorTemplate = Handlebars.compile(
  `<div class="errorPageContainer">
    <div>
      <h1>{{ code }}</h1>
      <h3>{{ messege }}</h3>
      {{{ link }}}
    </div>
  </div>`
);
