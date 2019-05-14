package com.decathlon.ara.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;

public class QSource extends EntityPathBase<Source> {

    private static final long serialVersionUID = 1358007620L;

    public static final QSource source = new QSource("source");

    public final StringPath code = createString("code");

    public final StringPath defaultBranch = createString("defaultBranch");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ComparablePath<Character> letter = createComparable("letter", Character.class);

    public final StringPath name = createString("name");

    public final BooleanPath postmanCountryRootFolders = createBoolean("postmanCountryRootFolders");

    public final NumberPath<Long> projectId = createNumber("projectId", Long.class);

    public final EnumPath<com.decathlon.ara.domain.enumeration.Technology> technology = createEnum("technology", com.decathlon.ara.domain.enumeration.Technology.class);

    public final StringPath vcsUrl = createString("vcsUrl");

    public QSource(String variable) {
        super(Source.class, forVariable(variable));
    }

    public QSource(Path<? extends Source> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSource(PathMetadata metadata) {
        super(Source.class, metadata);
    }

}

