package br.org.ciag.gmf.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.org.ciag.gmf.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DisciplinasTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Disciplinas.class);
        Disciplinas disciplinas1 = new Disciplinas();
        disciplinas1.setId(1L);
        Disciplinas disciplinas2 = new Disciplinas();
        disciplinas2.setId(disciplinas1.getId());
        assertThat(disciplinas1).isEqualTo(disciplinas2);
        disciplinas2.setId(2L);
        assertThat(disciplinas1).isNotEqualTo(disciplinas2);
        disciplinas1.setId(null);
        assertThat(disciplinas1).isNotEqualTo(disciplinas2);
    }
}
