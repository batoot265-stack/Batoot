import { json, err } from '../../_shared.js';

export async function onRequestPut({ params, request, env }) {
  try {
    const { status } = await request.json();
    if (!status) return err('status is required', 400);
    await env.DB.prepare('UPDATE orders SET status = ? WHERE id = ?')
      .bind(status, params.id).run();
    return json({ ok: true, id: params.id, status });
  } catch (e) {
    return err(e.message);
  }
}

export async function onRequestDelete({ params, env }) {
  try {
    await env.DB.prepare('DELETE FROM orders WHERE id = ?').bind(params.id).run();
    return json({ ok: true, id: params.id });
  } catch (e) {
    return err(e.message);
  }
}
