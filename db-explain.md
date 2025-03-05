## Skema Database Sistem Pelacakan Fitur, Bug, dan Pengajuan

Skema database ini dirancang untuk mendukung sistem pelacakan fitur, laporan bug, dan pengajuan peningkatan (requests) dalam sebuah platform bernama Driplab

### Tabel

1.  **`users` Table**

    - **Fungsi:** Menyimpan informasi dasar tentang pengguna sistem Scalev.
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik yang otomatis bertambah.
      - `username` `VARCHAR(255)`: Nama pengguna (username).
      - `email` `VARCHAR(255)`: Alamat email pengguna.
      - `created_at` `TIMESTAMP`: Tanggal dan waktu akun dibuat.

2.  **`features` Table**

    - **Fungsi:** Menyimpan informasi tentang fitur-fitur.
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik.
      - `title` `VARCHAR(255)`: Judul fitur.
      - `description` `TEXT`: Deskripsi detail.
      - `status` `FEATURE_STATUS`: Status fitur (enum).
      - `created_at` `TIMESTAMP`: Tanggal dan waktu dibuat.
      - `updated_at` `TIMESTAMP`: Tanggal dan waktu diperbarui.
      - `user_id` `INT [ref: > users.id]`: Foreign key ke `users` (pembuat fitur).

3.  **`bug_reports` Table**

    - **Fungsi:** Menyimpan informasi tentang laporan bug.
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik.
      - `title` `VARCHAR(255)`: Judul bug.
      - `description` `TEXT`: Deskripsi detail.
      - `status` `BUG_STATUS`: Status bug (enum).
      - `created_at` `TIMESTAMP`: Tanggal dan waktu dilaporkan.
      - `updated_at` `TIMESTAMP`: Tanggal dan waktu diperbarui.
      - `user_id` `INT [ref: > users.id]`: Foreign key ke `users` (pelapor bug).

4.  **`requests` Table**

    - **Fungsi:** Menyimpan pengajuan (fitur, bug, peningkatan).
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik.
      - `title` `VARCHAR(255)`: Judul pengajuan.
      - `description` `TEXT`: Deskripsi detail.
      - `type` `REQUEST_TYPE`: Jenis pengajuan (enum).
      - `status` `REQUEST_STATUS`: Status pengajuan (enum).
      - `created_at` `TIMESTAMP`: Tanggal dan waktu diajukan.
      - `updated_at` `TIMESTAMP`: Tanggal dan waktu diperbarui.
      - `user_id` `INT [ref: > users.id]`: Foreign key ke `users` (pembuat pengajuan).

5.  **`votes` Table**

    - **Fungsi:** Mencatat voting/likes pada pengajuan.
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik.
      - `user_id` `INT [ref: > users.id]`: Foreign key ke `users` (pemberi vote).
      - `request_id` `INT [ref: > requests.id]`: Foreign key ke `requests` (pengajuan yang di-vote).
      - `created_at` `TIMESTAMP`: Tanggal dan waktu vote.

6.  **`comments` Table**

    - **Fungsi:** Menyimpan komentar pada pengajuan.
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik.
      - `user_id` `INT [ref: > users.id]`: Foreign key ke `users` (pemberi komentar).
      - `request_id` `INT [ref: > requests.id]`: Foreign key ke `requests` (pengajuan yang dikomentari).
      - `content` `TEXT`: Isi komentar.
      - `created_at` `TIMESTAMP`: Waktu komentar dibuat.
      - `updated_at` `TIMESTAMP`: Waktu komentar diupdate.

7.  **`activity_log` Table**

    - **Fungsi:** Mencatat aktivitas di sistem (audit, history).
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik.
      - `user_id` `INT [ref: > users.id]`: Foreign key ke `users` (pelaku aktivitas).
      - `object_type` `ACTIVITY_OBJECT_TYPE`: Objek terlibat (enum).
      - `object_id` `INT`: ID objek (misalnya, ID request).
      - `activity_type` `ACTIVITY_TYPE`: Jenis aktivitas (enum).
      - `description` `TEXT`: Deskripsi aktivitas.
      - `created_at` `TIMESTAMP`: Waktu aktivitas.

8.  **`tags` Table**

    - **Fungsi:** Menyimpan daftar tag untuk kategorisasi.
    - **Kolom:**
      - `id` `SERIAL [pk, increment]`: Primary key, integer unik.
      - `name` `VARCHAR(255)`: Nama tag.

9.  **`feature_tags`, `bug_tags`, `request_tags` Tables**

    - **Fungsi:** Menghubungkan fitur, bug, dan request dengan tag (relasi Many-to-Many).
    - **Kolom:**
      - `feature_id` `INT [ref: > features.id]`: Foreign key ke `features`.
      - `bug_id` `INT [ref: > bug_reports.id]`: Foreign key ke `bug_reports`.
      - `request_id` `INT [ref: > requests.id]`: Foreign key ke `requests`.
      - `tag_id` `INT [ref: > tags.id]`: Foreign key ke `tags`.

### Enums

- `FEATURE_STATUS`:
  - `planned`
  - `in_progress`
  - `completed`
  - `rejected`
- `BUG_STATUS`:
  - `open`
  - `in_progress`
  - `resolved`
  - `closed`
- `REQUEST_TYPE`:
  - `feature`
  - `bug`
  - `improvement`
- `REQUEST_STATUS`:
  - `submitted`
  - `approved`
  - `rejected`
  - `in_progress`
  - `completed`
- `ACTIVITY_OBJECT_TYPE`:
  - `feature`
  - `bug`
  - `request`
  - `comment`
- `ACTIVITY_TYPE`:
  - `created`
  - `updated`
  - `deleted`
  - `status_changed`
  - `commented`
  - `voted`

### Relasi

- **One-to-Many:**
  - `users` -> `features`, `bug_reports`, `requests`, `votes`, `comments`, `activity_log`
  - `requests` -> `votes`, `comments`
- **Many-to-Many:**
  - `features` <-> `tags`
  - `bug_reports` <-> `tags`
  - `requests` <-> `tags`

### Catatan

- Buat indeks pada kolom yang sering digunakan.
- Normalisasi untuk mengurangi redundansi.
- Pertimbangkan keamanan data.
- Rencanakan untuk skalabilitas.
