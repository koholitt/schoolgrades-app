#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/42cb53f25fa203dca9c5cf23c337405f0e58a4a4dbf93712a69759ce57054348/contract';
import endContract from '../../snapshots/42cb53f25fa203dca9c5cf23c337405f0e58a4a4dbf93712a69759ce57054348/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'grades',
        columns: [
          col('grade', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('opportunity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('register_date', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('student_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('teacher_group_subject_id', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'groups',
        columns: [
          col('creation_date', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('finish_date', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('semester', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('turn', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('groups_turn_check_5bcc94b2', `"turn" IN ('morning', 'afternoon')`),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'student_groups',
        columns: [
          col('group_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('student_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'students',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('last_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('middle_name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'subjects',
        columns: [
          col('credits', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('semester', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'teacher_group_subjects',
        columns: [
          col('group_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('subject_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('teacher_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'teachers',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('last_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('middle_name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'grades',
        constraint: 'grades_student_id_teacher_group_subject_id_opportunity_key',
        columns: ['student_id', 'teacher_group_subject_id', 'opportunity'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'student_groups',
        constraint: 'student_groups_student_id_group_id_key',
        columns: ['student_id', 'group_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'students',
        constraint: 'students_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teacher_group_subjects',
        constraint: 'teacher_group_subjects_teacher_id_group_id_subject_id_key',
        columns: ['teacher_id', 'group_id', 'subject_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teachers',
        constraint: 'teachers_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'grades',
        index: 'grades_student_id_idx_dcf4f5c9',
        columns: ['student_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'grades',
        index: 'grades_teacher_group_subject_id_idx_66c40f71',
        columns: ['teacher_group_subject_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_groups',
        index: 'student_groups_group_id_idx_704354b6',
        columns: ['group_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_groups',
        index: 'student_groups_student_id_idx_dcf4f5c9',
        columns: ['student_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_group_subjects',
        index: 'teacher_group_subjects_group_id_idx_704354b6',
        columns: ['group_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_group_subjects',
        index: 'teacher_group_subjects_subject_id_idx_89a59b1c',
        columns: ['subject_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_group_subjects',
        index: 'teacher_group_subjects_teacher_id_idx_ae9f106d',
        columns: ['teacher_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'grades',
        foreignKey: {
          name: 'grades_student_id_fkey',
          columns: ['student_id'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'grades',
        foreignKey: {
          name: 'grades_teacher_group_subject_id_fkey',
          columns: ['teacher_group_subject_id'],
          references: { schema: 'public', table: 'teacher_group_subjects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_groups',
        foreignKey: {
          name: 'student_groups_student_id_fkey',
          columns: ['student_id'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_groups',
        foreignKey: {
          name: 'student_groups_group_id_fkey',
          columns: ['group_id'],
          references: { schema: 'public', table: 'groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teacher_group_subjects',
        foreignKey: {
          name: 'teacher_group_subjects_teacher_id_fkey',
          columns: ['teacher_id'],
          references: { schema: 'public', table: 'teachers', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teacher_group_subjects',
        foreignKey: {
          name: 'teacher_group_subjects_group_id_fkey',
          columns: ['group_id'],
          references: { schema: 'public', table: 'groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teacher_group_subjects',
        foreignKey: {
          name: 'teacher_group_subjects_subject_id_fkey',
          columns: ['subject_id'],
          references: { schema: 'public', table: 'subjects', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
