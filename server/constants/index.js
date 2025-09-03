export const BASE_BANNER =
    'Draft only; clinician review required; not a medical device; may be inaccurate.';

export const EMERGENCY_KEYWORDS = [
    'chest pain',
    'shortness of breath',
    'suicidal',
    'anaphylaxis',
    'stroke'
];

export const ABSOLUTE_KEYWORDS = [
    /\b(always)\b/gi,
    /\b(never)\b/gi,
    /\b(will|guarantees?|cures?)\b/gi,
];