package com.selotech.ai.greenng.box;

import java.util.List;

/**
 * A daily Mystery Box: one realistic financial scenario the user must decide on.
 * <p>
 * Immutable by design — the box content is a fact, only the Decision changes.
 *
 * @param id       stable identifier of the box
 * @param category domain bucket, e.g. {@code debt-and-financing}
 * @param title    short headline shown before the box is opened
 * @param scenario the full situation the user must reason about
 * @param options  the possible decisions, in display order
 */
public record MysteryBox(
        String id,
        String category,
        String title,
        String scenario,
        List<String> options
) {
}
