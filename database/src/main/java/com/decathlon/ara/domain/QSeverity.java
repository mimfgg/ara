/******************************************************************************
 * Copyright (C) 2019 by the ARA Contributors                                 *
 *                                                                            *
 * Licensed under the Apache License, Version 2.0 (the "License");            *
 * you may not use this file except in compliance with the License.           *
 * You may obtain a copy of the License at                                    *
 *                                                                            *
 * 	 http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                            *
 * Unless required by applicable law or agreed to in writing, software        *
 * distributed under the License is distributed on an "AS IS" BASIS,          *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   *
 * See the License for the specific language governing permissions and        *
 * limitations under the License.                                             *
 *                                                                            *
 ******************************************************************************/

package com.decathlon.ara.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;

public class QSeverity extends EntityPathBase<Severity> {

    private static final long serialVersionUID = -892759578L;

    public static final QSeverity severity = new QSeverity("severity");

    public final StringPath code = createString("code");

    public final BooleanPath defaultOnMissing = createBoolean("defaultOnMissing");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath initials = createString("initials");

    public final StringPath name = createString("name");

    public final NumberPath<Integer> position = createNumber("position", Integer.class);

    public final NumberPath<Long> projectId = createNumber("projectId", Long.class);

    public final StringPath shortName = createString("shortName");

    public QSeverity(String variable) {
        super(Severity.class, forVariable(variable));
    }

    public QSeverity(Path<? extends Severity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSeverity(PathMetadata metadata) {
        super(Severity.class, metadata);
    }

}

