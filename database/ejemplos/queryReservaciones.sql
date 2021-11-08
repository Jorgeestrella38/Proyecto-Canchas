SELECT res.ID idReservacion, unix_timestamp(res.Fecha_Inicio) fechaInicio, unix_timestamp(res.Fecha_Fin) fechaFin, res.Aprobada aprobada, res.ID_Usuario idUsuario, res.ID_Cancha idCancha,
       usr.Nombre_Completo nombreUsuario, usr.Es_Admin esAdmin, res.Fecha_Inicio inicioModoText, res.Fecha_Fin finModoTexto
        FROM Reservaciones res
        JOIN Usuarios usr on res.ID_Usuario = usr.ID
        WHERE ID_Cancha = 1 AND
        (Fecha_Inicio BETWEEN '2020-11-06 17:52:56' AND '2022-11-06 17:52:56')
        ORDER BY Fecha_Inicio;

INSERT INTO Reservaciones(Fecha_Inicio, Fecha_Fin, Aprobada, ID_Usuario, ID_Cancha)
    VALUES ('2021-11-08 13:00:00',
    '2021-11-08 14:00:00',
    false,
    '0226259',
    1);