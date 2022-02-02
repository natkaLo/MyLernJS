import React from 'react';
import RestoServiceContext from '../resto-service-context';
//компонент высшего порядка
//для работы с консюмером. Чтобы не создавать его каждые раз как обертку для наших компонентов
// это ф-ция, которая возвращает ф-цию. Как аргумент получает какой-то компонент(Wrapped)
//Этому компоненту (Wrapped) мы можем передать какие-то свойства. Поэтому пишем props
//Обернем тот компонент, который нам передан и который нужно отрендарить в consumer
//RestoService получаем из провайдера как аргумент
//передаем в компонент Wrapped все пропсы {...props} и пропорти RestoService

const WithRestoService = () => (Wrapped) => {
    return (props) => {
        return (
            <RestoServiceContext.Consumer>
                {
                    (RestoService) => {
                        return <Wrapped{...props} RestoService = {RestoService}/>
                    }
                }
            </RestoServiceContext.Consumer>
        )
    };
};

export default WithRestoService;