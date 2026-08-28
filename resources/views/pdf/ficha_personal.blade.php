<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Ficha Personal - Fundación Alalay</title>
    <style>
        @page {
            margin: 2.54cm;
        }
        body {
            font-family: 'Arial', sans-serif;
            font-size: 11pt;
            color: #000000;
            line-height: 2;
            margin: 0;
            padding: 0;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
        }
        .header-table td {
            vertical-align: middle;
            border: none;
        }
        .doc-title {
            text-align: right;
            font-size: 13pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .section-box {
            margin-bottom: 10px;
            page-break-inside: avoid;
        }
        .section-title {
            background-color: #e2e2e2;
            font-weight: bold;
            font-size: 10pt;
            text-align: center;
            padding: 4px;
            border: 1px solid #555555;
            text-transform: uppercase;
            margin-bottom: -1px;
        }

        .grid-table {
            width: 100%;
            border-collapse: collapse;
        }
        .grid-table th, .grid-table td {
            border: 1px solid #555555;
            padding: 4px 6px;
            font-size: 9.5pt;
            vertical-align: middle;
        }
        .grid-table th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-align: center;
        }

        .main-info-table {
            width: 100%;
            border-collapse: collapse;
        }
        .main-info-table td {
            vertical-align: top;
            padding: 0;
            border: none;
        }

        .label-cell {
            font-weight: bold;
            /* background-color: #f8f8f8; */
            width: 25%;
        }
        .value-cell {
            width: 25%;
        }

        .photo-container {
            width: 150px;
            height: 150px;
            border: 1px solid #555555;
            
            text-align: center;
            vertical-align: middle;
            background-color: #fafafa;
        }
        .photo-container img {
            max-width: 100%;
            max-height: 100%;
            /* padding-top: 5%; */
            display: block;
            margin: 0 auto;
        }
        .photo-placeholder {
            font-size: 9pt;
            color: #777777;
            padding: 40px 20px;
        }

        .croquis-box {
            width: 100%;
            text-align: center;
            border: 1px solid #555555;
            border-top: none;
            padding: 5px;
            box-sizing: border-box;
        }
        .croquis-img {
            max-height: 150px;
            max-width: 98%;
        }

        .signatures-table {
            width: 100%;
            margin-top: 100px;
            border-collapse: collapse;
            page-break-inside: avoid;
        }
        .signatures-table td {
            width: 50%;
            text-align: center;
            vertical-align: bottom;
            border: none;
            font-size: 10pt;
        }
        .signature-line {
            border-top: 1px solid #000000;
            width: 65%;
            margin: 0 auto 4px auto;
        }

        .text-center { text-align: center; }
        .text-empty { font-style: italic; color: #666666; text-align: center; }
    </style>
</head>
<body>

    <table class="header-table">
        <tr>
            <td style="width: 35%;">
                <strong style="font-size: 12pt;">Fundación ALALAY</strong>
            </td>
            <td style="width: 65%;" class="doc-title">
                FICHA PERSONAL
            </td>
        </tr>
    </table>

    <div class="section-box">
        <div class="section-title">Información General</div>
        <table class="main-info-table">
            <tr>
                <td>
                    <table class="grid-table">
                        <tr>
                            <td class="label-cell">Apellido Paterno</td>
                            <td class="value-cell" colspan="3">{{ strtoupper($persona->paterno) }}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Apellido Materno</td>
                            <td class="value-cell" colspan="3">{{ strtoupper($persona->materno) }}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Nombres</td>
                            <td class="value-cell" colspan="3">{{ strtoupper($persona->nombres) }}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">C.I.</td>
                            <td class="value-cell">{{ $persona->ci }} {{ $persona->ci_expedicion }}</td>
                            <td class="label-cell">Sexo</td>
                            <td class="value-cell">{{ strtoupper($persona->sexo) }}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Teléfono</td>
                            <td class="value-cell">{{ $persona->telefono ?? '-' }}</td>
                            <td class="label-cell">Celular</td>
                            <td class="value-cell">{{ $persona->celular ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Estado Civil</td>
                            <td class="value-cell">{{ strtoupper($persona->estado_civil) }}</td>
                            <td class="label-cell">Nº de Hijos</td>
                            <td class="value-cell">{{ $persona->numero_hijos ?? 0 }}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Fecha Nacimiento</td>
                            <td class="value-cell" colspan="3">
                                {{ $persona->fecha_nacimiento ? \Carbon\Carbon::parse($persona->fecha_nacimiento)->format('d/m/Y') : '-' }}
                            </td>
                        </tr>
                        <tr>
                            <td class="label-cell">Lugar Nacimiento</td>
                            <td class="value-cell" colspan="3">
                                <strong>Provincia:</strong> {{ $persona->lugar_nacimiento_provincia ?? '-' }} &nbsp;&nbsp; 
                                <strong>Ciudad:</strong> {{ $persona->lugar_nacimiento_ciudad ?? '-' }}
                            </td>
                        </tr>
                        <tr>
                            <td class="label-cell">Mail Personal</td>
                            <td class="value-cell" colspan="3">{{ $persona->email ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Domicilio actual</td>
                            <td class="value-cell" colspan="3">{{ $persona->direccion_actual ?? '-' }}</td>
                        </tr>
                    </table>
                </td>
                <td style="width: 140px; padding-left: 4px;">
                    <div class="photo-container">
                        @if(!empty($foto_url))
                            <img src="{{ $foto_path }}" alt="foto">
                        @else
                            <div class="photo-placeholder">Fotografía</div>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
    </div>
    
<div class="croquis-box">
    <img 
        src="https://static-maps.yandex.ru/1.x/?lang=es_ES&ll={{ $longitude }},{{ $latitude }}&z=16&l=map&pt={{ $longitude }},{{ $latitude }},pm2rdm&size=650,250" 
        class="croquis-img"
        alt="Mapa de Ubicación"
    >
</div>

    <div class="section-box">
        <div class="section-title">Información Institucional</div>
        <table class="grid-table">
            <tr>
                <td class="label-cell" style="width: 25%;">Fecha de Ingreso a la Fundación</td>
                <td class="value-cell" style="width: 25%;">
                    {{ $persona->fecha_ingreso_fundacion ? \Carbon\Carbon::parse($persona->fecha_ingreso_fundacion)->format('d/m/Y') : '-' }}
                </td>
                <td class="label-cell" style="width: 15%;">Cargo</td>
                <td class="value-cell" style="width: 35%;">{{ $persona->cargo_actual ?? '-' }}</td>
                <td class="label-cell" style="width: 15%;">Oficina Actual </td>
                <td class="value-cell" style="width: 35%;">{{ $persona->oficina_actual ?? '-' }}</td>
            </tr>
        </table>
    </div>

    <div class="section-box">
        <div class="section-title">Información Profesional</div>
        @if($persona->estudios->count())
            <table class="grid-table">
                <thead>
                    <tr>
                        <th style="width: 30%;">Instrucción</th>
                        <th style="width: 45%;">Título Obtenido</th>
                        <th style="width: 20%;">Institución</th>
                        <th style="width: 5%;">Año</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($persona->estudios as $estudio)
                        <tr>
                            <td>{{ $estudio->tipo }}</td>
                            <td>{{ $estudio->titulo_obtenido }}</td>
                            <td>{{ $estudio->institucion }}</td>
                            <td class="text-center">{{ $estudio->anio }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <table class="grid-table">
                <tr><td class="text-empty">No registra información profesional cargada.</td></tr>
            </table>
        @endif
    </div>

    <div class="section-box">
        <div class="section-title">Experiencia Laboral</div>
        @if($persona->experienciasLaborales->count())
            <table class="grid-table">
                <thead>
                    <tr>
                        <th style="width: 40%;">Institución</th>
                        <th style="width: 35%;">Cargo</th>
                        <th style="width: 25%;">Fecha ingreso y salida</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($persona->experienciasLaborales as $exp)
                        <tr>
                            <td>{{ $exp->institucion }}</td>
                            <td>{{ $exp->cargo }}</td>
                            <td class="text-center">
                                {{ $exp->fecha_inicio ? \Carbon\Carbon::parse($exp->fecha_inicio)->format('d/m/Y') : '' }} - 
                                {{ $exp->fecha_fin ? \Carbon\Carbon::parse($exp->fecha_fin)->format('d/m/Y') : 'Actualidad' }}
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <table class="grid-table">
                <tr><td class="text-empty">No registra experiencia laboral.</td></tr>
            </table>
        @endif
    </div>

    <div class="section-box">
        <div class="section-title">Referencias Laborales</div>
        @if($persona->referenciasLaborales->count())
            <table class="grid-table">
                <thead>
                    <tr>
                        <th style="width: 40%;">Institución</th>
                        <th style="width: 35%;">Nombre</th>
                        <th style="width: 25%;">Teléfono / Celular</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($persona->referenciasLaborales as $ref)
                        <tr>
                            <td>{{ $ref->institucion ?? ($ref->experienciaLaboral->institucion ?? 'N/A') }}</td>
                            <td>{{ $ref->nombre_referente }}</td>
                            <td class="text-center">{{ $ref->telefono_celular }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <table class="grid-table">
                <tr><td class="text-empty">No registra referencias laborales.</td></tr>
            </table>
        @endif
    </div>

    <div class="section-box">
        <div class="section-title">Datos familiares</div>
        @php $familiares = $persona->contactos->where('es_familiar', true); @endphp
        @if($familiares->count())
            <table class="grid-table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Nombre</th>
                        <th style="width: 30%;">Parentezco</th>
                        <th style="width: 20%;">Edad</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($familiares as $familiar)
                        <tr>
                            <td>{{ $familiar->nombre }} {{ $familiar->paterno }} {{ $familiar->materno }}</td>
                            <td class="text-center">{{ $familiar->parentesco_relacion }}</td>
                            <td class="text-center">{{ $familiar->edad ?? '-' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <table class="grid-table">
                <tr><td class="text-empty">No registra datos familiares.</td></tr>
            </table>
        @endif
    </div>

    <div class="section-box">
        <div class="section-title">Referencias Personales (Al menos 3 referencias)</div>
        @php $personales = $persona->contactos->where('es_familiar', false); @endphp
        @if($personales->count())
            <table class="grid-table">
                <thead>
                    <tr>
                        <th style="width: 45%;">Nombre</th>
                        <th style="width: 30%;">Parentezco / Relación</th>
                        <th style="width: 25%;">Teléfono / Celular</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($personales as $personal)
                        <tr>
                            <td>{{ $personal->nombre }} {{ $personal->paterno }} {{ $personal->materno }}</td>
                            <td class="text-center">{{ $personal->parentesco_relacion }}</td>
                            <td class="text-center">{{ $personal->telefono_celular }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <table class="grid-table">
                <tr><td class="text-empty">No registra referencias personales.</td></tr>
            </table>
        @endif
    </div>

    <table class="signatures-table">
        <tr>
            <td>
                <div class="signature-line"></div>
                <strong>Firma del Postulante</strong>
            </td>
            <td>
                <div class="signature-line"></div>
                <strong>V°B° Talento Humano</strong>
            </td>
        </tr>
    </table>

</body>
</html>