import Handlebars from 'handlebars';
import emptyAva from '../../static/emptyAva.png'

export const AvatarInput = () =>
  Handlebars.compile(`
    <label for="avatar" class="avatarLabel"><img class="avatarImg" src=${emptyAva} width="100" height="100" /></label>
    <input type="file" class="avatarInput" id="avatar" name="avatar" accept="image/png, image/jpeg" />`
  )();


