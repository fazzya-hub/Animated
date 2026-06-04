# Pertanyaan Refleksi
## Kapan sebaiknya menggunakan Animated API vs Reanimated 2? Apa trade-off-nya?
animated digunakan pada project dengan animasi yang tidak terlalu kompleks karena kalau memakai animasi kompleks seperti drag dan drop itu akan patah patah berbeda dengan reanimated yang difokuskan untuk animasi yang kompleks seperti drag dan drop, zoom kalau animasi yang tidak terlalu kompleks yaitu swip, efek fade in fade out. trade offnhya yang tadi udah diketik juga yaitu jika tidak didukung ole native driver akan lag atau patah patah

## Mengapa background task di iOS tidak dapat dijamin tepat waktu? Apa implikasinya untuk desain aplikasi?
karena yang saya tahu untuk background tas itu memakan baterai dan kesehatan perangkat dengan itu ios sangat ketat soal ini jadi dia memiliki power management, nah dari situ mengapa background di ios ga pernah tepat waktu. implikasinya jangan digunakan untuk hal hal krusial kaya pengirima pesan darurat

## Dalam konteks In-App Purchases, mengapa server-side validation lebih aman dari client-side validation?
karena kalau  server-side validation itu mentimpan data didalam server berbeda dengan client-side validation yang menyimpan data didalam aplikasi yang sangat rentang dan dapat di hacker menggunakan frida

## Bagaimana lazy loading image dapat meningkatkan performa aplikasi secara signifikan?
ada beberapa cara bagaimana lazi loading dapat meningkatkan performa aplikasi secara signifikan
1. menghemat penggunaan ram jadi hp yang bersefikasi rendah sangat aman tidak perlu khawawtir crash
2. mempercepat teks atau tampilan muncul jadi aplikasi bisafokus ke ui atau teks atau navigasi yang penting terlebih dahulu jadi lebih responsif
3. mengehmat server jadi backend tidak terus terusan menerima request data
