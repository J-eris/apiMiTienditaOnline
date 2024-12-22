import sequelize from "../config/database";
import { QueryTypes } from "sequelize";

export const ejecutarSP = async (
  spName: string,
  params: { [key: string]: any }
): Promise<any> => {
  const formattedParams = Object.entries(params)
    .map(([key, value]) =>
      value !== null && value !== undefined
        ? `@${key}='${value}'`
        : `@${key}=NULL`
    )
    .join(", ");
  const query = `EXEC ${spName} ${formattedParams}`;
  return await sequelize.query(query, { type: QueryTypes.RAW });
};

export const ejecutarVista = async (VistaNme: string): Promise<any> => {
  const query = `SELECT * FROM ${VistaNme}`;
  return await sequelize.query(query, { type: QueryTypes.SELECT });
};
