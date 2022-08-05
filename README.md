# academy-practice-pre-serverless

Practice pre-serverless in Backend Academy

- Antes de comenzar a levantar el project se debe correr lo siguiente:
  - npm install
  - npm run docker-watch (previamente se debe tener instalado docker)
  - npm run dev (esto corre la aplicación en desarrollo)

Casos de Uso (roles):

- `admin`: En este role el usuario tiene permisos para ver todos, ver individualmente, editar y eliminar. También puede ver los comercios, ver individualmente, editar y eliminarlos. Los usuarios administradores solo pueden pasar a tener ese rol si un usuario admin le actualiza el role.
- `editor`: En este role el editor puede ver su propio usuario y editarlo (no puede eliminarse a si mismo). Solo puede ver el comercio que tiene asignado. En este caso este role puede realizar el CRUD de la colección productos. El mismo solo puede ser creado por el usuario admin. Este usuario no tiene acceso a las ordenes de pago.
- `customer`: Este role es del lado del cliente, el cual puede crear su usuario, editar y ver solamente sus datos (no puede eliminarse a si mismo), de forma obligatoria debe eligir un comercio para posteriormente crear una orden de compra del mismo. Este usuario puede ver los productos y crear, editar y eliminar una orden de pago la cual estará asociada a su comercio.
- `guest`: El usuario visitante puede crear, editar y ver supropio perfil siempre teniendo en cuenta que debe asignarse a un comercio. También puede ver los productos pero no tiene permisos para crear ordenes de compra, en el caso de cambiarse de role a customer se le habiliará esas opciones (tener siempre en cuenta que el customer debe asociarse a un comercio).

**** Tener en cuenta que tanto el usuario `customer` como `guest` solo puede asignarse esos dos roles, los demas permisos solo lo puede asignar un administrador ****