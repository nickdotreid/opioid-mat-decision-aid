from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Effect
from .models import Medication
from .models import MedicationEffect

class AllMedicationsViewTest(APITestCase):

    def test_list_medications(self):
        MedicationEffect.objects.create(
            medication = Medication.objects.create(
                name = 'Sample Medication',
                slug = 'sample-medication'
            ),
            effect = Effect.objects.create(
                name = 'Sample Effect',
                slug = 'sample-effect'
            ),
            label = 'Sample label',
            value = 'Sample value'
        )
        Effect.objects.create(
            name = 'Other Effect',
            slug = 'other-effect'
        )

        response = self.client.get(reverse('medications-all'))

        self.assertEqual(response.status_code, 200)
        effect_names = [effect['name'] for effect in response.data['effects']]
        effect_keys = [effect['key'] for effect in response.data['effects']]
        self.assertEqual(effect_names, ['Sample Effect', 'Other Effect'])
        self.assertEqual(effect_keys, ['sampleEffect', 'otherEffect'])
        medication_names = [medication['name'] for medication in response.data['medications']]
        medication_keys = [medication['key'] for medication in response.data['medications']]
        self.assertEqual(medication_names, ['Sample Medication'])
        self.assertEqual(medication_keys, ['sampleMedication'])
        medication = response.data['medications'][0]
        self.assertEqual(medication['sampleEffect'][0]['value'], 'Sample value')
        self.assertEqual(medication['sampleEffect'][0]['label'], 'Sample label')
        self.assertFalse('otherEffect' in medication)
