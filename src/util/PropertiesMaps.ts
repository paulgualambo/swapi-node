import { Planet } from '../model/Planet';
import { Vehicle } from '../model/Vehicle';

export const transformPropertiesPlanet = (item: Planet) => {
  return {
    nombre: item.name,
    clima: item.climate,
    gravedad: item.gravity,
    periodo_orbital: item.orbital_period,
    poblacion: item.population,
    diametro: item.diameter,
    periodo_rotacion: item.rotation_period,
    agua_superficie: item.surface_water,
    terreno: item.terrain,
    url: item.url,
  };
};

export const transformPropertiesVehicle = (item: Vehicle) => {
  return {
    capacidad_carga: item.cargo_capacity,
    consumibles: item.consumables,
    costo_creditos: item.cost_in_credits,
    creado: item.created,
    tripulacion: item.crew,
    editado: item.edited,
    longitud: item.length,
    fabricante: item.manufacturer,
    modelo: item.model,
    nombre: item.name,
    url: item.url,
    clase_vehiculo: item.vehicle_class,
  };
};
